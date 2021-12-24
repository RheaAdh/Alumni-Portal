import { storage } from './firebase';

export const lottieOptions = (animation, loop = true) => ({
    loop,
    autoplay: true,
    animationData: animation,
});

export const storeFile = async (folderNname, fileName, file) => {
    console.log('file');
    console.log(file);
    const storageRef = storage.ref();
    const folderRef = storageRef.child(folderNname);
    const fileRef = folderRef.child(fileName);
    let url = '';
    if (file) {
        await fileRef.put(file);
        url = await fileRef.getDownloadURL();
    }
    return url;
};
