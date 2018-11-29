import React , {Component} from 'react';

export default class Navbar extends Component {
render(){
        return(
        <div>
            <View style={styles.navBar}>
                <TouchableOpacity
                    onPress={()=>this.generateLinkedin()}>
                    <Icon name='linkedin-square' size={30}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.generateEmail()}>
                    <Icon name='mail' size={30}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.generateFacebook()}>
                    <Icon name='facebook-square' size={30}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.generateInstagram()}>
                    <Icon name='instagram' size={30}/>
                </TouchableOpacity>
            </View>
        </div>

        );
    }
}

const styles = Stylesheet.create({
    navBar:{
        height:50,
        backgroundColor:'white',
        elevation:3,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
});

