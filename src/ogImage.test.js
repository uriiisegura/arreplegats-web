const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const whatsappRecommendedImageSize = 600 * 1024;
const routeMeta = require("./data/routeMeta.json");

const getIndexHtml = () => {
  return fs.readFileSync(
    path.join(projectRoot, "public", "index.html"),
    "utf8"
  );
};

const getMetaTags = () => {
  const indexHtml = getIndexHtml();

  return [...indexHtml.matchAll(/<meta\s+[^>]*>/gi)].map((match) => {
    return Object.fromEntries(
      [...match[0].matchAll(/([a-zA-Z:-]+)=["']([^"']*)["']/g)].map(
        ([, name, value]) => [name, value]
      )
    );
  });
};

const getMetaContent = (attributeName, attributeValue) => {
  const tag = getMetaTags().find((metaTag) => {
    return metaTag[attributeName] === attributeValue;
  });

  return tag?.content;
};

const getDocumentTitle = () => {
  return getIndexHtml().match(/<title>([^<]*)<\/title>/i)?.[1];
};

const getSocialImagePath = () => {
  const imageUrl = getMetaContent("property", "og:image");
  const imagePath = new URL(imageUrl).pathname.replace(/^\//, "");

  return path.join(projectRoot, "public", imagePath);
};

const getPngDimensions = (buffer) => {
  if (!buffer.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
};

const getJpegDimensions = (buffer) => {
  if (buffer.readUInt16BE(0) !== 0xffd8) {
    return null;
  }

  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      break;
    }

    const marker = buffer[offset + 1];
    const segmentLength = buffer.readUInt16BE(offset + 2);
    const isStartOfFrame =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      ![0xc4, 0xc8, 0xcc].includes(marker);

    if (isStartOfFrame) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += 2 + segmentLength;
  }

  return null;
};

const getImageDimensions = (imagePath) => {
  const buffer = fs.readFileSync(imagePath);

  return getPngDimensions(buffer) || getJpegDimensions(buffer);
};

describe("OG image metadata", () => {
  test("uses a complete social preview title", () => {
    const title =
      "Arreplegats de la Zona Universitària | Colla Castellera";

    expect(getMetaContent("name", "title")).toBe(title);
    expect(getMetaContent("property", "og:title")).toBe(title);
    expect(getMetaContent("property", "twitter:title")).toBe(title);
    expect(getDocumentTitle()).toBe(title);
    expect(title.length).toBeGreaterThanOrEqual(50);
    expect(title.length).toBeLessThanOrEqual(60);
  });

  test("uses the homepage SEO description for static social previews", () => {
    const description = routeMeta.routes[""].description;

    expect(getMetaContent("name", "description")).toBe(description);
    expect(getMetaContent("property", "og:description")).toBe(description);
    expect(getMetaContent("property", "twitter:description")).toBe(description);
  });

  test("uses the shared social image for Open Graph and Twitter", () => {
    expect(getMetaContent("property", "og:image")).toBe(
      "https://arreplegats.cat/og-image.jpg"
    );
    expect(getMetaContent("property", "og:image:type")).toBe("image/jpeg");
    expect(getMetaContent("property", "og:image:width")).toBe("1200");
    expect(getMetaContent("property", "og:image:height")).toBe("630");
    expect(getMetaContent("property", "og:image:alt")).toBe(
      "Arreplegats de la Zona Universitària fent un castell"
    );
    expect(getMetaContent("property", "twitter:image")).toBe(
      "https://arreplegats.cat/og-image.jpg"
    );
    expect(getMetaContent("property", "twitter:image:alt")).toBe(
      "Arreplegats de la Zona Universitària fent un castell"
    );
  });

  test("provides a 1200x630 social image", () => {
    const imagePath = getSocialImagePath();

    expect(fs.existsSync(imagePath)).toBe(true);
    expect(getImageDimensions(imagePath)).toEqual({
      width: 1200,
      height: 630,
    });
  });

  test("keeps the shared social image below WhatsApp's recommended size", () => {
    const imagePath = getSocialImagePath();

    expect(fs.statSync(imagePath).size).toBeLessThan(
      whatsappRecommendedImageSize
    );
  });
});
