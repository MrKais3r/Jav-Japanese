import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const backendApiCall = async () => {
  const res = await fetch("http://localhost:8080/hello");
  const text = res.text();
  return text;
};

export default async function Home() {
  const message = await backendApiCall();

  return (
    <div className={styles.page}>
      <h1>Turbo + go</h1>
      <h3>{`Message from Backend : ${message}`}</h3>
    </div>
  );
}
