import './new.css'
import React, { useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import {IoSearch,IoClose} from 'react-icons/io5'
import {AnimatePresence, motion} from 'framer-motion'
import {useClickOutside} from 'react-click-outside-hook'
import MoonLoader from 'react-spinners/MoonLoader'
import { useDebounce } from '../../../hooks/debouncerHook'


const SearchBarContainer = styled(motion.div)`
    display : flex;
    flex-direction : column;
    width : 24em;
    height : 3.3em;
    background-color : #fff;
    border-radius : 6px;
    box-shadow : 0px 2px 12px 3px rgba(0,0,0,0.14);
    overflow : hidden;
    position : absolute;
    left : -280px;
    top : -25px;
    z-index : 2;

`;

const SearchInputContainer = styled.div`
    width : 100%;
    min-height: 3em;
    display : flex;
    align-items : center;
    position : relative;
    padding : 2px 15px;
`;

const SearchInput = styled.input`
    width : 100%;
    height : 100%;
    outline : none;
    border: none;
    font-size : 19px;
    color : #12112e;
    font-weight : 500;
    border-radius : 6px;
    background-color : transparent;

    &:focus{
        outline : none;
        &::placeholder{
            opacity:0;
        }
    }

    &::placeholder{
        color : #bebebe;
        transition : all 250ms ease-in-out;
    }
`;

const SearchIcon = styled.span`
    color : #bebebe;
    font-size: 27px;
    margin-right : 10px;
    margin-top : -3px;
    vertical-align : middle;
`;

const CloseIcon = styled(motion.span)`
    color : #bebebe;
    font-size : 23px;
    vertical-align:middle;
    transition : all 200ms ease-in-out;
    cursor : pointer;

    &:hover {
        color : #dfdfdf
    }
`;

const LineSeparator = styled.span`
    display : flex;
    min-width : 100%;
    min-height : 2px;
    background-color : #d8d8d878
`;

const SearchContent = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : column;
    padding : 1em;
`;

const LoadingWrapper = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    align-items : center;
    justify-content : center;
`;


const containerVariants = {
    expanded : {
        height : "20em" 
    },
    collapsed : {
        height : "3.0em"
    }
}

const containerTransition = {
    type: 'spring',
    damping : 22,
    stiffness : 150
}

export default function SearchBar(props) {
    const [isExpanded,setExpanded] = useState(false)
    const [parentRef,isClickedOutside] = useClickOutside()
    const inputRef = useRef();
    const [searchQuery,setSearchQuery] = useState("")
    const [isLoading,setLoading] = useState(false);

    const changeHandler = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value)
    }

    const expandContainer = () => {
        setExpanded(true);
    };

    const collapseContainer = () => {
        setExpanded(false)
        setSearchQuery("")
        if(inputRef.current)
            inputRef.current.value = '';
    }

    useEffect(() => {
        if(isClickedOutside) collapseContainer();
    },[isClickedOutside])

    
    const prepareSearchQuery = (query) => {
        
    }

    const searchEvent = () =>{
        if(!searchQuery || searchQuery.trim() === "")
            return;

        setLoading(true)
    }

    useDebounce(searchQuery, 500 , searchEvent);

    
    return (
        <div className='alignTop'>
        <SearchBarContainer 
            animate={isExpanded ? 'expanded' : 'collapsed'} 
            variants={containerVariants}
            transition = {containerTransition}
            ref = {parentRef} >
            <SearchInputContainer>
                <SearchIcon>
                    <IoSearch />
                </SearchIcon>
                <SearchInput 
                    placeholder="Seach for Events"
                    onFocus={expandContainer}
                    ref={inputRef}
                    value= {searchQuery}
                    onChange = {changeHandler}
                />
                <AnimatePresence>
                    {isExpanded && (
                    <CloseIcon 
                        key='close-icon' 
                        initial={{opacity : 0}} 
                        animate= {{opacity:1}}
                        exit = {{opacity:0}} 
                        onClick={collapseContainer}
                        transition={{duration:0.2}}>
                            <IoClose />
                    </CloseIcon>
                )}
                </AnimatePresence>
            </SearchInputContainer>
            <LineSeparator/>
            <SearchContent>
                <LoadingWrapper>
                    <MoonLoader loading color="#000" size={20}/>
                </LoadingWrapper>
            </SearchContent>
        </SearchBarContainer>
        </div>
    )
}