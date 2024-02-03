function isValidUri(url)
{
    // let outputUrl;
  
    // try {
    //     outputUrl = new URL(url);
    // } catch (_) {
    //     return false;  
    // }
    return true;
}
function extractUniqueId(url)
{
    try{
        let queryString = new URLSearchParams(url);
        for(let pair of queryString.entries()) {
            return pair[0];
        }
    }
    catch{
        return ""
    }
}

export default {
    isValidUri,
    extractUniqueId
}