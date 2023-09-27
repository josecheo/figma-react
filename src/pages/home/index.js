import { Typography, Input, Button } from "@/components";
import styles from "./styles.module.css";

export default function Register() {
  return (
    <div className={styles.register}>
      <div className={styles.registercontainer}>
        <div className={styles.formcontainer}>
          <Typography
            size="title"
            weight="bold"
            text="Login In"
            color="primary"
          />
          <Input placeholder="Placeholder" />
          <Input placeholder="Placeholder" />
          <Input placeholder="Placeholder" />
          <Input placeholder="Placeholder" />
          <div className={styles.buttoncontainer}>
            <Button variant="primary" size="large" label="Register" />
          </div>
          <Typography
            size="small"
            weight="light"
            text="or register whit "
            color="black"
          />
          <div className={styles.registerbycontainer}>
            <Button variant="secondary" size="large" label="Google" />
            <Button variant="primary" size="large" label="Facebook" />
          </div>
        </div>
      </div>
      <div className={styles.containerinfo}>
        <div className={styles.infocontainer}>
          <div className={styles.titlecontainer}>
            <Typography
              size="title"
              weight="bold"
              text="Sushi ! asimsc"
              color="black"
            />
          </div>
          <Typography
            size="caption"
            weight="extraLight"
            text="Discover a world of flavors and Japanese culinary traditions like never before. Contrary to popular belief."
            color="black"
          />
        </div>
      </div>
    </div>
  );
}
