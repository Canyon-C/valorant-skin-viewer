import { RawSkinData, Skin } from "./api-data-class";
import { ReactElement } from "react";
import Image from "next/image";

const DEFAULT_VIDEO_VOLUME = 0.15;

export class Render {
  data: Skin;

  constructor(data: Skin) {
    this.data = data;
  }

  renderSkinChromas() {
    return this.data.chromaRenders.map((render, index) => (
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
    ));
  }

  renderBaseChroma() {
    return [
      <div
        key="base-chroma"
        className="flex justify-center items-center h-28 w-36"
      >
        <Image
          className="object-contain"
          src={this.data.chromaRenders[0]}
          width={512}
          height={128}
          loading="lazy"
          alt={""}
        ></Image>
      </div>,
    ];
  }

  renderChromaVideos() {
    return this.data.chromaVideos
      .map((video, index) => {
        if (video === null) return null;
        return (
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
            <source src={video} type="video/mp4"></source>
          </video>
        );
      })
      .filter(Boolean);
  }

  renderLevelVideos() {
    return this.data.levelVideos
      .map((levelVideo, index) => {
        if (levelVideo === null) return null;
        return (
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
            <source src={levelVideo} type="video/mp4"></source>
          </video>
        );
      })
      .filter(Boolean);
  }

  renderChromaSwatches() {
    return this.data.chromaSwatches.map((swatch, index) =>
      swatch ? (
        <div
          key={index}
          className="w-8 h-8 border-2 border-white cursor-pointer hover:scale-110 transition-transform"
        >
          <Image
            className="w-full h-full object-contain"
            src={swatch}
            width={32}
            height={32}
            loading="lazy"
            alt={""}
          />
        </div>
      ) : (
        <div
          key={index}
          className="w-8 h-8 bg-gray-500 border-2 border-white cursor-pointer hover:scale-110 transition-transform"
        />
      )
    );
  }

  renderLevelSelectors() {
    return this.data.levelVideos
      .map((level, index) => {
        if (level === null) return null;
        return (
          <button key={index} className="py-1 md:py-3">
            {index + 1}
          </button>
        );
      })
      .filter(Boolean);
  }

  get chromaLength() {
    return this.data.chromaVideos.length;
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
  data!: Render;
  apiData: SkinApi;

  constructor(uuid: string) {
    this.apiData = new SkinApi(uuid);
  }

  async initialize() {
    this.data = await this.apiData.getData();
  }
}
