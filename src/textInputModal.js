import { KeyboardAvoidingView, Modal, Pressable, TextInput, View } from "react-native";

export default ({textInputModalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackdrop}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={textInputModalVisible}>
            {/* <KeyboardAvoidingView 
                behavior={Platform.os === "ios" ? "padding" : "height"}
                style ={{flex:1}}> */}
                <Pressable onPress={onPressBackdrop} style ={{flex: 1}}>
                    <View style={{width:"100%", position:"absolute", bottom: 0}}>
                        <TextInput 
                            placeholder="앨범명을 입력해주세요"
                            style={{width:"100%", height:50, paddingHorizontal: 10, paddingVertical:10, borderWidth:0.5, borderColor:"lightgrey"}}
                            value={albumTitle}
                            onChangeText={setAlbumTitle}
                            onSubmitEditing={onSubmitEditing}
                            autoFocus={true}
                            />
                    </View>
                </Pressable>
            {/* </KeyboardAvoidingView> */}
            
        </Modal>
    );
};