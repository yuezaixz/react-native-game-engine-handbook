import React from "react";
import GameEngineExample from "./game-engine";
import OverrideRendererExample from "./override-renderer";
import BallExample from "./ball";
import DonkeyKong from "react-native-donkey-kong";

export default function (mount) {
	return {
		heading: "Examples",
		items: [
			{
				heading: "Game Engine",
				onPress: _ => mount(<GameEngineExample />)
			},
			{
				heading: "Override Renderer",
				onPress: _ => mount(<OverrideRendererExample />)
			},
			{
				heading: "Ball Game",
				onPress: _ => mount(<BallExample />)
			},
			{
				heading: "DonkeyKong",
				onPress: _ => mount(<DonkeyKong />)
			}
		]
	}
}