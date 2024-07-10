import React, {createContext, useContext, useReducer, useEffect} from 'react';
import Products from '@/db/products.json';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

// Action types
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_SORT_OPTION = 'SET_SORT_OPTION';
const SET_FILTER_OPTION = 'SET_FILTER_OPTION';

// Reducer function
const productReducer = (state, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.payload, filteredProducts: action.payload};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload};
        case SET_SORT_OPTION:
            return {...state, sortOption: action.payload};
        case SET_FILTER_OPTION:
            return {...state, filterOption: action.payload};
        default:
            return state;
    }
};

// Initial state
const initialState = {
    products: [],
    filteredProducts: [],
    currentPage: 1,
    productsPerPage: 10,
    sortOption: 'name',
    filterOption: '',
};

export const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({type: SET_PRODUCTS, payload: Products});
        };
        fetchProducts();
    }, []);

    // Apply sorting
    const sortProducts = (option) => {
        const sorted = [...state.filteredProducts].sort((a, b) => {
            if (option === 'name') {
                return a.name.localeCompare(b.name);
            } else if (option === 'price') {
                return a.price - b.price;
            }
            return 0;
        });
        dispatch({type: SET_PRODUCTS, payload: sorted});
        dispatch({type: SET_SORT_OPTION, payload: option});
    };

    // Apply filtering
    const filterProducts = (option) => {
        if (option === '') {
            dispatch({type: SET_PRODUCTS, payload: state.products});
        } else {
            const filtered = state.products.filter(product => product.category === option);
            dispatch({type: SET_PRODUCTS, payload: filtered});
        }
        dispatch({type: SET_FILTER_OPTION, payload: option});
        dispatch({type: SET_CURRENT_PAGE, payload: 1});
    };

    // Get current products for pagination
    const indexOfLastProduct = state.currentPage * state.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - state.productsPerPage;
    const currentProducts = state.filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => dispatch({type: SET_CURRENT_PAGE, payload: pageNumber});

    const value = {
        ...state,
        currentProducts,
        totalProducts: state.filteredProducts.length,
        sortProducts,
        filterProducts,
        paginate,
        dispatch,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;