// chuyển đổi 1 tệp file thành chuỗi base64

class CommonUtils {

    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    }
}

export default CommonUtils;