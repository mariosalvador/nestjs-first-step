

export class Slug {

  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(slug: string) {
    return new Slug(slug)
  }


  /**
   * Receive a string and normalize it as slug
   * 
   * example: "An example title"=>"an-example-title"
   * 
   * @param text {string}
   */

  static createFromText(text: string) {
    const slugText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");
    return new Slug(slugText);
  }
}