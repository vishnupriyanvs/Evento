



export const useStyleSet = ()=>{

    const styleSet = (item, key) => {
        let a = document.querySelectorAll('.SelectnBtn1-content');
        if (item === 'InProgress')
            a[key].setAttribute('style', 'outline:1px solid #FF8A00; color:#FF8A00')
        if (item === 'Cancelled')
            a[key].setAttribute('style', 'outline: 1px solid rgb(243, 20, 20); color:rgb(243, 20, 20);')
        if (item === 'Active')
            a[key].setAttribute('style', 'outline: 1px solid #0000FF; color: #0000FF')
        if (item === 'Completed')
            a[key].setAttribute('style', 'outline:1px solid rgb(20, 243, 20); color: rgb(20, 243, 20)')

    }

    return{
        styleSet
    }
}