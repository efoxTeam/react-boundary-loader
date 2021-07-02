module.exports = {
    allTrim: (str)=>{
        return str.replace(/\s+/g, "")
    },
    allClearBr: (str)=>{
        str = str.replace(/<\/?.+?>/g,"")
        str = str.replace(/[\r\n]/g, "") 
        return str
    },
}