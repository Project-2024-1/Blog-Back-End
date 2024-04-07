export const errorHandle = (statusCode, devMsg, userMsg, moreInfo ) => {
    return {
        statusCode: statusCode,
        DevMsg: devMsg,
        UserMsg: userMsg,
        MoreInfo: moreInfo
    }
}