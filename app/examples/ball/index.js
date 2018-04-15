import React, { Component } from "react";
import { StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, MoveBox } from "./systems";
import { Box, Ball } from "./renderers";
import Matter from "matter-js";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default class BallExample extends Component {
    constructor() {
        super();
    }

    render() {
        const { width, height } = Dimensions.get("window");
        const ballSize = 75

        const engine = Matter.Engine.create({ enableSleeping: false });
        const world = engine.world;
        const body = Matter.Bodies.circle(
            width / 2,
            height-ballSize-ballSize/4,
            ballSize/2,
            { density:0.003, friction:1, frictionStatic:0, restitution:0.5 }
        );
        const floor = Matter.Bodies.rectangle(
            width / 2,
            height - 2,
            width,
            ballSize,
            {
                isStatic: true,
                restitution: 1
            }
        );
        const leftWall = Matter.Bodies.rectangle(
            2 - ballSize / 2, 
            height / 2, 
            ballSize, 
            height, 
            {
                isStatic: true,
                restitution: 1
            }
        );
        const rightWall = Matter.Bodies.rectangle(
            width + ballSize / 2 - 2, 
            height / 2, 
            ballSize, 
            height,
            {
                isStatic: true,
                restitution: 1
            }
        );

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 0.01,
            stiffness: 0.1,
            angularStiffness: 1
        });

        Matter.World.add(world, [body, floor, leftWall, rightWall]);
        Matter.World.addConstraint(world, constraint);

        return (
            <GameEngine
                // systems={[Physics, CreateBox, MoveBox, CleanBoxes]}
                systems={[Physics, MoveBox]}
                entities={{
                    physics: {
                        engine: engine,
                        world: world,
                        constraint: constraint
                    },
                    ball: {
                        body: body,
                        radius: ballSize,
                        color: "pink",
                        renderer: Ball
                    },
                    floor: {
                        body: floor,
                        size: [width, ballSize],
                        color: "#86E9BE",
                        renderer: Box
                    },
                    leftWall: {
                        body: leftWall,
                        size: [2, height],
                        color: "#86E9BE",
                        renderer: Box
                    },
                    rightWall: {
                        body: rightWall,
                        size: [2, height],
                        color: "#86E9BE",
                        renderer: Box
                    }
                }}
            >
                <StatusBar hidden={true} />
            </GameEngine>
        );
    }
}