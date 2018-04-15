import React, {Component} from "react";
import {
  View,
  Image
} from "react-native";
import Svg, {Path, Rect} from "react-native-svg";

class Box extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;
        const angle = this.props.body.angle;

        return (
            <View
                style={
                    {
                        position: "absolute",
                        left: x,
                        top: y,
                        width: width,
                        height: height,
                        transform: [{rotate: angle + "rad"}],
                        backgroundColor: this.props.color || "pink"
                    }
                }
            />
        );
    }
}

class Ball extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const radius = this.props.radius;
        const x = this.props.body.position.x - radius / 2;
        const y = this.props.body.position.y - radius / 2;
        const angle = this.props.body.angle;

        return (
            <View
                style={
                    {
                      position: "absolute",
                      left: x,
                      top: y,
                      width: radius,
                      height: radius,
                      borderRadius: radius / 2,
                      transform: [{rotate: angle + "rad"}],
                      backgroundColor: this.props.color || "pink"
                    }
                }
            >
                <Image
                    source={require("../../assets/basketball.png")}
                    height={radius}
                    width={radius}
                />
            </View>
        );
    }
}

class Cloth extends Component {
    constructor(props) {
        super(props);
    }

    getBoxs(){
        return this.props.body.bodies.map((item, index)=>{
            const x = item.position.x - 10 / 2;
            const y = item.position.y - 10 / 2;
            return (
                <View key={"cloth"+index} style={
                    {
                        position: "absolute",
                        left: x,
                        top: y,
                        width: 10,
                        height: 10,
                        borderWidth: 1,
                        borderColor: "pink"
                    }
                } />
            )
        })
    }

    render() {
        return (
            <View>
                {this.getBoxs()}
            </View>
        );
    }
}

export {
    Box,
    Ball,
    Cloth
};
