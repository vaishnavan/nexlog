function createSlugUrl(urlString){
    return urlString.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-')
}

export {
    createSlugUrl
}