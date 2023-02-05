import { Image, Modal, Pressable, TextInput, TouchableOpacity, View } from "react-native";
import {SimpleLineIcons} from '@expo/vector-icons';

const ArrowButton=({iconName, onPress, disabled }) => {
    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{paddingHorizontal:20, height:"100%", justifyContent:"center"}}>
            <SimpleLineIcons 
                name={iconName}
                size={20}
                color={disabled?"transparent":"black"}
                >
            </SimpleLineIcons>
        </TouchableOpacity>
    );
}

export default ({
    bigImgModalVisible, 
    onPressBackdrop,
    selectedImage,
    onPressLeftArrow,
    onPressRightArrow,
    showPreviousArrow,
    showNextArrow}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={bigImgModalVisible}>
                <Pressable onPress={onPressBackdrop} 
                    style ={{
                        flex: 1, 
                        alignItems:"center",
                        backgroundColor:`rgba(115,115,115,0.5)`,
                        justifyContent:"center"}}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} disabled={!showPreviousArrow}/>
                        <Pressable>
                            <Image 
                                source={{uri:selectedImage?.uri}}
                                style={{width: 280, height:280}}
                                resizeMode="contain"
                                />
                        </Pressable>
                        <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} disabled={!showNextArrow} />
                    </View>
                </Pressable>
        </Modal>
    );
};