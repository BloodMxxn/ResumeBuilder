import { useResumeStore } from "../../../stores";
import Field from "./Field";

export default function PersonalInfo() {
  const s = useResumeStore();

  return (
    <div className="space-y-3">
      <Field label="Full Name">
        <input
          value={s.name}
          onChange={(e) => s.setName(e.target.value)}
          placeholder="John Doe"
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Email">
          <input
            value={s.email}
            onChange={(e) => s.setEmail(e.target.value)}
            placeholder="john@example.com"
            className="input"
          />
        </Field>
        <Field label="Phone">
          <input
            value={s.phone}
            onChange={(e) => s.setPhone(e.target.value)}
            placeholder="+1 234 567 890"
            className="input"
          />
        </Field>
      </div>

      <Field label="Address">
        <input
          value={s.address}
          onChange={(e) => s.setAddress(e.target.value)}
          placeholder="City, Country"
          className="input"
        />
      </Field>

      <Field label="Website / LinkedIn">
        <input
          value={s.website}
          onChange={(e) => s.setWebsite(e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
          className="input"
        />
      </Field>
    </div>
  );
}
