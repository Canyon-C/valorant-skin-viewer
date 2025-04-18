import { RawSkinData, Skin } from "./api-data-class";
import { ReactElement } from "react";
import Image from "next/image";

const DEFAULT_VIDEO_VOLUME = 0.15;

export class Render {
  data: Skin;
  skinChromas: ReactElement[] = [];
  skinChromaVideos: ReactElement[] = [];
  skinLevelVideos: ReactElement[] = [];
  allChromas: ReactElement[] = [];
  constructor(data: Skin) {
    this.data = data;
  }

  renderSkinChromas() {
    this.data.chromaRenders.map((render, index) => {
      {
        this.skinChromas.push(
          <div
            key={index}
            className="object-contain flex justify-center items-center h-28 w-36"
          >
            <Image
              className="object-contain"
              src={render}
              width={512}
              height={128}
              loading="lazy"
              alt={""}
            ></Image>
          </div>
        );
      }
    });
    return this.skinChromas;
  }

  renderBaseChroma() {
    this.allChromas.push(
      <div className="flex justify-center items-center h-28 w-36">
        <Image
          className="object-contain"
          src={this.data.chromaRenders[0]}
          width={512}
          height={128}
          loading="lazy"
          alt={""}
        ></Image>
      </div>
    );

    return this.allChromas;
  }

  renderChromaVideos() {
    this.data.chromaVideos.map((video, index) => {
      if (video !== null) {
        this.skinChromaVideos.push(
          <video
            className="displayborder-2 rounded-lg object-contain volume"
            key={index}
            controls
            autoPlay
            ref={(el) => {
              if (el) {
                el.volume = DEFAULT_VIDEO_VOLUME;
              }
            }}
          >
            <source src={`${video}`} type="video/mp4"></source>
          </video>
        );
      }
    });
    return this.skinChromaVideos;
  }

  renderLevelVideos() {
    this.data.levelVideos.map((levelVideo, index) => {
      if (levelVideo !== null) {
        this.skinLevelVideos.push(
          <video
            key={index}
            className="w-full h-full rounded-lg object-contain"
            controls
            autoPlay
            ref={(el) => {
              if (el) {
                el.volume = DEFAULT_VIDEO_VOLUME;
              }
            }}
          >
            <source src={`${levelVideo}`} type="video/mp4"></source>
          </video>
        );
      }
    });
    return this.skinLevelVideos;
  }

  levelLength() {
    const levelIndex: JSX.Element[] = [];

    this.data.levelVideos.map((level, index) => {
      if (level !== null) {
        levelIndex.push(
          <button key={index} className="py-1 md:py-3">
            {index + 1}
          </button>
        );
      }
    });
    return levelIndex;
  }

  chromaLength() {
    const chromaLength: JSX.Element[] = [];

    this.data.chromaVideos.map((level, index) => {
      chromaLength.push(
        <button key={index} className="py-1 md:py-3">
          {index}
        </button>
      );
    });
    return chromaLength.length;
  }
}

export class SkinApi {
  skin_uuid: string;

  constructor(skin_uuid: string) {
    this.skin_uuid = skin_uuid;
  }

  async getData() {
    const response = await fetch(
      `https://valorant-api.com/v1/weapons/skins/${this.skin_uuid}`,
      { cache: "force-cache" }
    );
    const rawData = await response.json();
    const skinsData: RawSkinData = rawData.data;

    return new Render(new Skin(skinsData));
  }
}

export class ApiDataInstance {
  data: Render = {} as Render;
  apiData: SkinApi;

  constructor(uuid: string) {
    this.apiData = new SkinApi(uuid);
  }

  async initialize() {
    this.data = await this.apiData.getData();
  }
}
