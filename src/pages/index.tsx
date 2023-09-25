import Button from "@/components/Button";
import Typography from "@/components/Typography";

export default function Home() {
  return (
    <div className="home">
      <div className="principalcontainer">
        <div className="infocontainer">
          <Typography size="caption" weight="bold" text="undefined" />

          <Typography size="caption" weight="bold" text="undefined" />

          <div className="buttoncontainer">
            <Button variant="primary" size="large" label="undefined" />

            <Button variant="secondary" size="large" label="undefined" />
          </div>
        </div>
      </div>

      <div className="logincontainer"></div>
    </div>
  );
}
