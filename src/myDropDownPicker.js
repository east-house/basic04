import { View, Text, TouchableOpacity } from "react-native"

const headerheight =50

const arrow_text =({dropDownOpen}) => {
    <Text>dropDown {dropDownOpen}</Text>
    if (dropDownOpen) {
        return " v"
    } else {
        return " ^"
    }
}
export default ({onLongPress, onPressAlbum, albums, dropDownOpen, onPressHeader, selectedAlbum, onPressAddAblum}) => {
    return (
        <View>
        <TouchableOpacity activeOpacity={1} onPress={onPressHeader} style={{height:headerheight, justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
            <Text style={{fontWeight:"bold"}}>{selectedAlbum.title}</Text>
            <Text>{arrow_text(dropDownOpen)}</Text>
            <TouchableOpacity 
                onPress={onPressAddAblum}
                style={{position:"absolute", 
                    right:0, 
                    height:headerheight,  
                    justifyContent:"center", 
                    alignItems:"center",
                    paddingHorizontal:10,
                    }}>
                <Text style={{fontSize:12}}>앨범 추가</Text>
            </TouchableOpacity>
            </TouchableOpacity>
            {dropDownOpen && (
                <View style={{position: "absolute",top:headerheight, width:"100%", borderBottomColor:"grey", borderBottomWidth: 0.5,
                    borderTopColor:"grey", borderTopWidth: 0.5}}>
                    {albums.map((album, index) => {
                        const isSelectedAlbum = album.id === selectedAlbum.id;
                        return (
                            <TouchableOpacity 
                                key={`ablum-${index}`}
                                activeOpacity={1}
                                style={{backgroundColor:"#FFFFFF", 
                                    paddingVertical:12, 
                                    width: "100%", 
                                    alignItems:"center", 
                                    justifyContent:"center"}} 
                                onPress={() => onPressAlbum(album)}
                                onLongPress={() => onLongPress(album.id)}>
                            <Text style={{fontWeight: isSelectedAlbum ? "bold" : undefined}}>{album.title}</Text>
                        </TouchableOpacity>
                        )
                    })}
                </View>
            )}
        </View>
        
    )
}