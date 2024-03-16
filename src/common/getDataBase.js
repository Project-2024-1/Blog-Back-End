export const getDataBase = (chuoi1, chuoi2) =>{
    if(chuoi1 === "" || chuoi1 === null || chuoi1 === undefined){
        return chuoi2
    }
    return chuoi1
};

export const getUrlBase = (text) => {
    // Xoá các khoảng trắng ở hai đầu
    text = text.trim();

    // Thay thế các kí tự thường có dấu bởi các kí tự thường không dấu
    text = text.replace(/(ä|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    text = text.replace(/ç/g, "c");
    text = text.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    text = text.replace(/(ì|í|î|ị|ỉ|ĩ)/g, "i");
    text = text.replace(/(ö|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    text = text.replace(/(ü|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    text = text.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    text = text.replace(/(đ)/g, "d");
    
    // Thay thế các kí tự viết hoa có dấu bởi các kí tự viết hoa không dấu
    text = text.replace(/(Ä|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g, "A");
    text = text.replace(/Ç/g, "C");
    text = text.replace(/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g, "E");
    text = text.replace(/(Ì|Í|Ị|Ỉ|Ĩ)/g, "I");
    text = text.replace(/(Ö|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g, "O");
    text = text.replace(/(Ü|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g, "U");
    text = text.replace(/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g, "Y");
    text = text.replace(/(Đ)/g, "D");
    
    // Thay thế các khoảng trắng bởi một dấu -
    text = text.replace(/[ \t\r\n\v\f]/g, "-");
    
    // Thay một hoặc nhiều kí tự trống bởi một dấu -
    text = text.replace(/( )+/g, "-");
    
    // Chỉ giữ lại các chữ cái từ A-Z, từ a-z, các số từ 0-9, dấu _ và dấu -
    text = text.replace(/[^A-Za-z0-9_-]/g, "-");
    
    // Thay một hoặc nhiều dấu _ bởi một đấu _
    text = text.replace(/(_)+/g, "_");
    
    // Thay một hoặc nhiều dấu - bởi một dấu -
    text = text.replace(/(-)+/g, "-");
    
    // Xoá những ký tự _ đầu và cuối
    text = text.replace(/^_+|_+$/g, "");
    
    // Xoá những ký tự - đầu và cuối
    text = text.replace(/^-+|-+$/g, "");
    
    return text.toLowerCase();
}
