import { PUBLIC_KEY } from "../constants/publicKey";

const pemToArrayBuffer = (pem: string) => {
  const base64 = pem
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\s/g, "");

  const binary = atob(base64);

  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));

  return bytes.buffer;
};

const importPublicKey = async (pem: string) => {
  return await crypto.subtle.importKey(
    "spki",
    pemToArrayBuffer(pem),
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["encrypt"],
  );
};

const publicKeyPromise = importPublicKey(PUBLIC_KEY);

const encrypt = async (data: object, publicKey: CryptoKey) => {
  const encoder = new TextEncoder();

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoder.encode(JSON.stringify(data)),
  );

  return encryptedBuffer;
};

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);

  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

export const encryptPayload = async (payload: object): Promise<string> => {
  const publicKey = await publicKeyPromise;
  const encryptedBuffer = await encrypt(payload, publicKey);
  return arrayBufferToBase64(encryptedBuffer);
};
