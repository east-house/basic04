import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGallery = () => {
    const defaultAlbum = {
        id : 1,
        title : "기본",
    }

    const ASYNC_KEY = {
        IMAGES:'images',
        ALBUMS:'albums'
    }
    const [images, setImages] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
    const [albums, setAlbums] = useState([defaultAlbum]);
    const [textInputModalVisible, setTextInputModalVisible] =useState(false);
    const [bigImgModalVisible, setBigImgModalVisible] =useState(false);
    const [albumTitle, setAlbumTitle] = useState("");
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [selectedImage, setSelectedImage]=useState(null);

    const _setImages= (newImages) => {
        setImages(newImages);
        AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages));
    };
    const _setAlbums= (newAlbums) => {
        setAlbums(newAlbums);
        AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums));
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const lastId = images.length === 0 ? 0 : images[images.length -1].id;
            const newImage ={
                id: lastId+1,
                uri : result.assets[0].uri,
                albumId : selectedAlbum.id
            }
            _setImages([
                ...images,
                newImage,
            ]);
        }
    };

    const deleteImage = (imageId) => {
        Alert.alert("이미지를 삭제하시겠습니까", "", [
            {
                style:"cancel",
                text:"아니오"
            },
            {
                text:"네",
                onPress : () => {
                    const newImage = images.filter((image) => image.id !==imageId)
                    _setImages(newImage);
                }
            }
        ])
    };

    const openTextInputModal = () => setTextInputModalVisible(true);
    const closeTextInputModal = () => setTextInputModalVisible(false);
    const openBigImgModal = () => setBigImgModalVisible(true);
    const closeBigImgModal = () => setBigImgModalVisible(false);
    const openDropDown = () => setDropDownOpen(true);
    const closeDropDown = () => setDropDownOpen(false);

    const filteredImages = images.filter((image)=> image.albumId === selectedAlbum.id);

    const imageWithAddButton = [
        ...filteredImages,
        {
            id: -1,
            uri: "",
        }
    ]
    const addAblum = () => {
        const lastId = albums.length === 0 ? 0 : albums[albums.length -1].id;
        const newAlbum = {
            id : lastId +1,
            title : albumTitle,
        };
        _setAlbums([
            ...albums,
            newAlbum,
        ])
        setSelectedAlbum(newAlbum);
    };

    const selectAlbum = (album) => {
        setSelectedAlbum(album)
    };

    const deleteAlbum =(albumId) => {
        if (albumId === defaultAlbum.id) {
            Alert.alert("기본 앨범은 삭제할 수 없어요")
            return;
        }
        Alert.alert("앨범을 삭제사히겠습니까?", "", [
            {
                style: "cancel",
                text: "아니요",
            },
            {
                text:"네",
                onPress: () => {
                    const newAlbum = albums.filter((album) => album.id !== albumId);
                    _setAlbums(newAlbum)
                    setSelectedAlbum(defaultAlbum);
                }
            }
        ])
    };

    const selectImage= (image) => {
        setSelectedImage(image)
    };
    const moveToPreviousImg=() => {
        if (!selectedImage) return;
        const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
        const previousImageIndex = selectedImageIndex -1
        if (previousImageIndex < 0) return;
        const previousImage = filteredImages[previousImageIndex]
        setSelectedImage(previousImage);
    };
    const moveToNextImg=()=>{
        if (!selectedImage) return;
        const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
        const nextImageIndex = selectedImageIndex +1
        if (nextImageIndex > filteredImages.length -1 || nextImageIndex===-1) return;
        const nextImage = filteredImages[nextImageIndex]
        setSelectedImage(nextImage);
    };

    const showPreviousArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !==0;
    const showNextArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !== filteredImages.length -1;


    const resetAlbumTitle= () => setAlbumTitle('');

    const initValues= async() => {
       const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
       if (imagesFromStorage !== null) {
        const parsed = JSON.parse(imagesFromStorage);
        setImages(parsed);
       } 
       const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
       if (albumsFromStorage !== null) {
        const parsed = JSON.parse(albumsFromStorage);
        setAlbums(parsed);
       }
    }; 

    useEffect(() => {
        initValues();
    }, []);

    return {
        imageWithAddButton,
        selectedAlbum,
        textInputModalVisible,
        pickImage,
        deleteImage,
        openTextInputModal,
        closeTextInputModal,
        albumTitle,
        setAlbumTitle,
        addAblum,
        resetAlbumTitle,
        dropDownOpen,
        openDropDown,
        closeDropDown,
        albums,
        selectAlbum,
        deleteAlbum,
        bigImgModalVisible,
        openBigImgModal,
        closeBigImgModal,
        selectImage,
        selectedImage,
        moveToPreviousImg,
        moveToNextImg,
        showPreviousArrow,
        showNextArrow
    }
}