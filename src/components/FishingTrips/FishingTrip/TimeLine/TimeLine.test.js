import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";

import TimeLine from "./TimeLine";
import TimeLineItem from "./TimeLineItem/TimeLineItem";

configure({ adapter: new Adapter() });

const data = [
    {
      id: 22479,
      fish: {
        id: 17,
        name: "BURBOT (Flight flight)",
        family: "",
        look:
          "Burbots are fish belonging to the cod family. Already by the very appearance it can be seen that they were correctly classified there. The burbot torso narrows towards the tail, has a large mouth, small teeth and one mustache on the lower lip. The body of these fish is slippery and covered with small scales. Marble, black, brown, green. It is reported that these fish grow to 4 kilograms, however, individuals over 50 cm can already be considered a fishing specimen.",
        photo: "https://angloo.com/wp-content/uploads/miętus-300x77.jpg",
        occurrence:
          "First of all, cold water with a lot of oxygen. Rivers, deep lakes. He liked the rocky bottom and around the shores. In addition, it can be found around the hard and pebbled bottom.",
        timeToFishing:
          "From November, when the nights begin to get really cool. The best effects in the evening and at night. It is popularly said that the worse the weather, the better burbot feeds.",
        bait:
          "Red worms, breezes, dead fish, live fish. Meat in various forms.",
        groundbait: "Groundbait shall not be used for half burbot.",
        methodAndTechnique:
          "The best results will be achieved when fishing on land or float.",
        equipment:
          "Ground : rod up to 4 meters long, flat weight, main line 0.25 mm, hook number 8. Float : set very similar to ground.",
        fishery: "rivers",
        periodOfProtection: "December 1 to the end of February",
        protectiveSize: "25 cm",
        record: "75 cm and 4.06 kg"
      },
      length: 124,
      weight: 412,
      time: "03:12:00"
    },
    {
      id: 22480,
      fish: {
        id: 19,
        name: "ROACH (Rutilus rutilus)",
        family: "Cyprinidae",
        look:
          "Roaches are fish with a small mouth, green or gray-blue back, red or orange eye, yellow-orange or even red fins. It is covered with a lot of mucus. Roaches grow up to two kilograms. However, individuals around 30 cm can be considered an achievement. Less experienced anglers often confuse her with weir and rudd. It feeds on practically everything that fits into its mouth, from insects, because all worms or small crustaceans.",
        photo: "https://angloo.com/wp-content/uploads/płoć.gif",
        occurrence:
          "Roaches are the most common fish found in virtually every water. We will not only find them in very low oxygen and high mountain waters. The most favorable conditions are found in still and slow flowing waters. Smaller individuals swim closer to the surface, while larger ones stick to the bottom. Bottom roaches are a great prey for every angler.",
        timeToFishing:
          " Do we fish all year round? winter spring Summer Autumn. It can be safely said that these fish open and close the fishing season. They are caught both from under the ice and immediately after it descends.",
        bait:
          "Red worms, breezes, white worms, pins, corn, wheat, pearl barley.",
        groundbait:
          "As a rule, light or dark roach groundbaits are used. Roasted hemp can be added.",
        methodAndTechnique:
          "Floating method gives the best results. However, in deeper places, where larger individuals gather, we have a chance to catch them on the ground, e.g. with a feeder.",
        equipment:
          "Remember about the delicate set and bait adjusted to the size of the fish.",
        fishery:
          "Excavation ponds, mountain rivers, medium lowland rivers, large lowland rivers. Slightly brackish shallow waters of the Baltic Sea, lakes, dam reservoirs, oxbow lakes.",
        periodOfProtection: "no protection period",
        protectiveSize: "no protective dimension",
        record: "47 cm and 1.57 kg"
      },
      length: 241,
      weight: 1234,
      time: "12:12:00"
    }
  ];

describe("< TimeLine/>", () => {
  it("should render zero <TimeLineItem /> elements", () => {
    const wrapper = shallow(<TimeLine fishes={[]} />);
    expect(wrapper.find(TimeLineItem)).toHaveLength(0);
  });
  it("should render two <TimeLineItem /> elements", () => {
    const wrapper = shallow(<TimeLine fishes={data} />);
    expect(wrapper.find(TimeLineItem)).toHaveLength(2);
  });
});
