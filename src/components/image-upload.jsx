import  {useCallback, useState} from "react";
import axios from "axios";
import {
    AudioWaveform,
    File,
    FileImage,
    FolderArchive,
    UploadCloud,
    Video,
    X,
} from "lucide-react";
import {useDropzone} from "react-dropzone";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";
import {ScrollArea} from "@/components/ui/scroll-area";

const FileTypes = {
    Image: "image",
    Pdf: "pdf",
    Audio: "audio",
    Video: "video",
    Other: "other",
};

const ImageColor = {
    bgColor: "bg-purple-600",
    fillColor: "fill-purple-600",
};

const PdfColor = {
    bgColor: "bg-blue-400",
    fillColor: "fill-blue-400",
};

const AudioColor = {
    bgColor: "bg-yellow-400",
    fillColor: "fill-yellow-400",
};

const VideoColor = {
    bgColor: "bg-green-400",
    fillColor: "fill-green-400",
};

const OtherColor = {
    bgColor: "bg-gray-400",
    fillColor: "fill-gray-400",
};

export default function ImageUpload() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [filesToUpload, setFilesToUpload] = useState([]);

    const getFileIconAndColor = (file) => {
        if (file.type.includes(FileTypes.Image)) {
            return {
                icon: <FileImage size={40} className={ImageColor.fillColor}/>,
                color: ImageColor.bgColor,
            };
        }

        if (file.type.includes(FileTypes.Pdf)) {
            return {
                icon: <File size={40} className={PdfColor.fillColor}/>,
                color: PdfColor.bgColor,
            };
        }

        if (file.type.includes(FileTypes.Audio)) {
            return {
                icon: <AudioWaveform size={40} className={AudioColor.fillColor}/>,
                color: AudioColor.bgColor,
            };
        }

        if (file.type.includes(FileTypes.Video)) {
            return {
                icon: <Video size={40} className={VideoColor.fillColor}/>,
                color: VideoColor.bgColor,
            };
        }

        return {
            icon: <FolderArchive size={40} className={OtherColor.fillColor}/>,
            color: OtherColor.bgColor,
        };
    };

    const onUploadProgress = (progressEvent, file, cancelSource) => {
        const progress = Math.round(
            (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
        );

        if (progress === 100) {
            setUploadedFiles((prevUploadedFiles) => {
                return [...prevUploadedFiles, file];
            });

            setFilesToUpload((prevUploadProgress) => {
                return prevUploadProgress.filter((item) => item.File !== file);
            });

            return;
        }

        setFilesToUpload((prevUploadProgress) => {
            return prevUploadProgress.map((item) => {
                if (item.File.name === file.name) {
                    return {
                        ...item,
                        progress,
                        source: cancelSource,
                    };
                } else {
                    return item;
                }
            });
        });
    };

    const uploadImageToCloudinary = async (
        formData,
        onUploadProgress,
        cancelSource
    ) => {
        return axios.post(
            `https://api.cloudinary.comimage/upload`,
            formData,
            {
                onUploadProgress,
                cancelToken: cancelSource.token,
            }
        );
    };

    const removeFile = (file) => {
        setFilesToUpload((prevUploadProgress) => {
            return prevUploadProgress.filter((item) => item.File !== file);
        });

        setUploadedFiles((prevUploadedFiles) => {
            return prevUploadedFiles.filter((item) => item !== file);
        });
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        setFilesToUpload((prevUploadProgress) => {
            return [
                ...prevUploadProgress,
                ...acceptedFiles.map((file) => {
                    return {
                        progress: 0,
                        File: file,
                        source: null,
                    };
                }),
            ];
        });

        // Cloudinary upload code is commented out in the original file
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div>
            <div>
                <label
                    {...getRootProps()}
                    className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                >
                    <div className=" text-center">
                        <div className=" border p-2 rounded-md max-w-min mx-auto">
                            <UploadCloud size={20}/>
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold">Drag files</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Click to upload files &#40;files should be under 10 MB &#41;
                        </p>
                    </div>
                </label>

                <Input
                    {...getInputProps()}
                    id="dropzone-file"
                    accept="image/png, image/jpeg"
                    type="file"
                    className="hidden"
                />
            </div>

            {filesToUpload.length > 0 && (
                <div>
                    <ScrollArea className="h-40">
                        <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
                            Files to upload
                        </p>
                        <div className="space-y-2 pr-3">
                            {filesToUpload.map((fileUploadProgress) => {
                                return (
                                    <div
                                        key={fileUploadProgress.File.lastModified}
                                        className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                                    >
                                        <div className="flex items-center flex-1 p-2">
                                            <div className="text-white">
                                                {getFileIconAndColor(fileUploadProgress.File).icon}
                                            </div>

                                            <div className="w-full ml-2 space-y-1">
                                                <div className="text-sm flex justify-between">
                                                    <p className="text-muted-foreground ">
                                                        {fileUploadProgress.File.name.slice(0, 25)}
                                                    </p>
                                                    <span className="text-xs">
                            {fileUploadProgress.progress}%
                          </span>
                                                </div>
                                                <Progress
                                                    progress={fileUploadProgress.progress}
                                                    className={
                                                        getFileIconAndColor(fileUploadProgress.File).color
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (fileUploadProgress.source)
                                                    fileUploadProgress.source.cancel("Upload cancelled");
                                                removeFile(fileUploadProgress.File);
                                            }}
                                            className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                                        >
                                            <X size={20}/>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>
            )}

            {uploadedFiles.length > 0 && (
                <div>
                    <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
                        Uploaded Files
                    </p>
                    <div className="space-y-2 pr-3">
                        {uploadedFiles.map((file) => {
                            return (
                                <div
                                    key={file.lastModified}
                                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
                                >
                                    <div className="flex items-center flex-1 p-2">
                                        <div className="text-white">
                                            {getFileIconAndColor(file).icon}
                                        </div>
                                        <div className="w-full ml-2 space-y-1">
                                            <div className="text-sm flex justify-between">
                                                <p className="text-muted-foreground ">
                                                    {file.name.slice(0, 25)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(file)}
                                        className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                                    >
                                        <X size={20}/>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}