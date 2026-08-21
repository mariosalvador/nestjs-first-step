

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
    const slugText = text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^\w\s-]/g, "")        // Remove qualquer caractere que não seja letra, número, espaço ou traço (REMOVE O '?')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");           // Troca espaços por traços

    return new Slug(slugText);
  }

}