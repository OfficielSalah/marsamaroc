export default function delay(s) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, s);
  });
}
