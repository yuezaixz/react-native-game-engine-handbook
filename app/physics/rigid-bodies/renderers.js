import React, {Component, PureComponent} from "react";
import {StyleSheet, View, ART, Dimensions} from "react-native";
import Svg, {Path, Rect} from "react-native-svg";
import {Vector} from "matter-js";

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

class Circle extends Component {
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
            />
        );
    }
}

class Cloth extends Component {
    constructor(props) {
        super(props);
    }

    getBoxs(){
        return this.props.body.bodies.map((item, index)=>{
            const x = item.position.x - 4 / 2;
            const y = item.position.y - 4 / 2;
            return (
                <View key={"cloth"+index} style={
                    {
                        position: "absolute",
                        left: x,
                        top: y,
                        width: 4,
                        height: 4,
                        borderRadius: 4 / 2,
                        backgroundColor: "pink"
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
    Circle,
    Cloth
};
