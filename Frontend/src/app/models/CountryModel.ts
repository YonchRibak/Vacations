export class CountryModel {
  name: {
    common: string;
    official: string;
    nativeName: {
      lang: {
        official: string;
        common: string;
      };
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
}
