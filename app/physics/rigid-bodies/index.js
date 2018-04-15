import React, { Component } from "react";
import { StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, CreateBox, MoveBox, CleanBoxes } from "./systems";
import { Box, Cloth } from "./renderers";
import Matter from "matter-js";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default class RigidBodies extends Component {
    constructor() {
        super();
    }

    render() {
        const { width, height } = Dimensions.get("window");
        const boxSize = Math.trunc(Math.max(width, height) * 0.075);

        const engine = Matter.Engine.create({ enableSleeping: false });
        const world = engine.world;
        const body = Matter.Bodies.rectangle(
            width / 2,
            -1000,
            boxSize,
            boxSize,
            { frictionAir: 0.021, restitution: 1 }
        );
        const floor = Matter.Bodies.rectangle(
            width / 2,
            height - boxSize / 2,
            width,
            boxSize,
            {
                isStatic: true,
                restitution: 1
            }
        );
        const leftWall = Matter.Bodies.rectangle(2 / 1, height / 2, 2, height, {
            isStatic: true,
            restitution: 1
        });
        const rightWall = Matter.Bodies.rectangle(
            width - 2 / 1,
            height / 2,
            2,
            height,
            {
                isStatic: true,
                restitution: 1
            }
        );

        // const test = Matter.Composites.softBody(200, 200, 12, 10, 2, 2, false, 4, {
        //     friction: 0.00001, // 摩擦力
        //     collisionFilter: {
        //         group: Matter.Body.nextGroup(true)
        //     },
        //     render: {
        //         visible: false,
        //     }
        // })
        // for (var i = 0; i < 20; i++) {
        //     test.bodies[i].isStatic = true;
        // }

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
                systems={[Physics, CreateBox, MoveBox, CleanBoxes]}
                entities={{
                    physics: {
                        engine: engine,
                        world: world,
                        constraint: constraint
                    },
                    box: {
                        body: body,
                        size: [boxSize, boxSize],
                        color: "pink",
                        renderer: Box
                    },
                    floor: {
                        body: floor,
                        size: [width, boxSize],
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
                    // test: {body: test, size: [100, 100], color: "#86E9BE", renderer: Cloth}
                }}
            >
                <StatusBar hidden={true} />
            </GameEngine>
        );
    }
}
