import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'

import {NavbarV0} from "@/components/NavbarV0";
import {LoginForm} from "@/components/LoginForm";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>

            <ComponentPreview path="/NavbarV0">
                <CompleteNavbar/>
            </ComponentPreview>
            <ComponentPreview path="/LoginForm">
                <LoginForm/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews