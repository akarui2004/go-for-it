import { v1, v4, v5 } from "uuid"

class StringUtils {
  public static readonly V5_NAMESPACE = "e33817c2-4cca-4ff9-b024-171bbd0138b2";

  public static uuidv1(): string {
    return v1();
  }

  public static uuidv4(): string {
    return v4();
  }

  public static uuidv5(input: string, namespace: string = StringUtils.V5_NAMESPACE): string {
    return v5(input, namespace);
  }
}

export default StringUtils;
