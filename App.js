import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BigImageModal from './src/BigImageModal';
import MyDropDownPicker from './src/myDropDownPicker';
import TextInputModal from './src/textInputModal';
import { useGallery } from './src/use-gallery';

const width = Dimensions.get('screen').width;
const columnSize = width / 3;


export default function App() {
  const {imageWithAddButton, 
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
    showNextArrow} = useGallery();

  // console.log('ImageWithAddButton : ', imageWithAddButton)
  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage =(imageId) => {
    deleteImage(imageId);
  };

  const onLongPressAlbum = (albumId) => {deleteAlbum(albumId)};
  const onPressWatchAd = () => {
    console.log('load ad');
  }
  const onPressAddAblum = () => {
    if (albums.length >= 2) {
      Alert.alert("광고를 시청해야 앨범을 추가 할 수 있습니다." ,"", [
        {
          style :"cancel",
          text : "닫기"
        },
        {
          text: "광고 시청",
          onPress: onPressWatchAd,
        }
      ])
    } else {
      openTextInputModal();
    }

  };
  const onSubmitEditing = () => {
    if (!albumTitle) return;

    addAblum();
    closeTextInputModal();
    resetAlbumTitle();
  };
  const onPressTextBackdrop =() => {
    closeTextInputModal()
  };
  const onPressHeader=() => {
    if (dropDownOpen) {
      closeDropDown()
    } else {
      openDropDown()
    }
  };
  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropDown();
  };

  const onPressImage=(image) =>{
    selectImage(image);
    openBigImgModal();
  };
  const onPressImgBackdrop=() => {
    console.log('bigImgModalVisible', bigImgModalVisible)
    closeBigImgModal();
  };

  const onPressLeftArrow=() => {
    moveToPreviousImg();
  };

  const onPressRightArrow = () =>{
    moveToNextImg();
  };

  const renderItem = ({item: image, index}) => {
    const {id, uri} = image;
    if (id === -1) {
      console.log('in')
      return (
        <TouchableOpacity 
        onPress={onPressOpenGallery}
        style={{
          width:columnSize, 
          height:columnSize, 
          backgroundColor:"lightgray",
          alignItems:"center",
          justifyContent:"center"}} >
            <Text style={{fontWeight: "100", fontSize:45}}>+</Text>
      </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={()=> onPressImage(image)} onLongPress={() => onLongPressImage(id)}>
        <Image source = {{uri : uri}} style ={{width:columnSize, height:columnSize}}/>
      </TouchableOpacity>
    )
  };
  return (
    <View style={styles.container}>
      {/* <Button title="갤러리 열기" onPress={onPressOpenGallery}/> */}
      <MyDropDownPicker 
        onLongPress={onLongPressAlbum}
        onPressAlbum={onPressAlbum} 
        albums={albums} 
        dropDownOpen={dropDownOpen} 
        onPressHeader={onPressHeader} 
        selectedAlbum={selectedAlbum} 
        onPressAddAblum={onPressAddAblum}/>
      <TextInputModal 
        textInputModalVisible={textInputModalVisible} 
        albumTitle={albumTitle} 
        setAlbumTitle={setAlbumTitle} 
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextBackdrop}/>

      <BigImageModal 
        bigImgModalVisible={bigImgModalVisible}
        onPressBackdrop={onPressImgBackdrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}/>
      <FlatList 
        data={imageWithAddButton}
        renderItem={renderItem}
        // horizontal
        numColumns={3}
        style={{zIndex: -1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
});
