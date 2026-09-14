export const encryptPayload = async (
  payload: object,
  pem: string,
): Promise<string> => {
  const publicKey = await importPublicKey(pem);
  const encryptedBuffer = await encrypt(payload, publicKey);
  return arrayBufferToBase64(encryptedBuffer);
};

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

 const encrypt = async (data: object, publicKey: CryptoKey) => {
  const encoder = new TextEncoder();

  const encryptedText = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoder.encode(JSON.stringify(data)),
  );

  return encryptedText;
};

 const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);

  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};
