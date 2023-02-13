const StyleDictionary = require("style-dictionary");

const boxShadowTransformer = {
  name: "boxShadowTransformer",
  type: "value",
  matcher: ({ type }) => type === "boxShadow",
  transformer: ({ original, value }) => {
    if (Array.isArray(value)) {
      let shadow = [];
      value.forEach(({ x, y, blur, spread, color }) => {
        shadow.push(`${x}px ${y}px ${blur}px ${spread}px ${color}`);
      });
      return shadow;
    }
    const { x, y, blur, spread, color } = original.value;
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  },
};

const mixinsFormatter = {
  name: "mixinsFormatter",
  formatter: ({ dictionary }) => {
    return dictionary.allTokens
      .map((token) => {
        if (token.type === "typography") {
          const {
            fontFamily,
            fontWeight,
            lineHeight,
            fontSize,
            letterSpacing,
            // paragraphSpacing,
            textDecoration,
            textCase,
          } = token?.value;
          const weight = {
            ["Medium"]: "500",
            ["Semi Bold"]: "600",
            ["Regular"]: "400",
          };

          return `@mixin ${token.name} {
   font-family: ${fontFamily};
   font-weight: ${weight[fontWeight]};
   line-height: ${!isNaN(lineHeight) ? `${lineHeight}px` : lineHeight};
   font-size: ${fontSize}px;
   text-decoration: ${textDecoration};
   text-transform: ${textCase};
   letter-spacing: ${letterSpacing};
}`;
        }
        return `$${token.name}: ${token.value};`;
      })
      .join("\n");
  },
};

const globalVariablesFilter = {
  name: "globalVariablesFilter",
  matcher: ({ original, type }) =>
    !original?.description?.includes("global") && type !== "typography",
};

const mixinsFilter = {
  name: "mixinsFilter",
  matcher: ({ type }) => type === "typography",
};

const withoutMixinsFilter = {
  name: "withoutMixinsFilter",
  matcher: ({ type }) => type !== "typography",
};

StyleDictionary.registerFilter(mixinsFilter);
StyleDictionary.registerFormat(mixinsFormatter);
StyleDictionary.registerFilter(withoutMixinsFilter);
StyleDictionary.registerFilter(globalVariablesFilter);
StyleDictionary.registerTransform(boxShadowTransformer);
StyleDictionary.registerTransformGroup({
  name: "custom-transform",
  transforms: ["boxShadowTransformer", "name/cti/kebab"],
});

const StyleDictionaryMixins = StyleDictionary.extend({
  source: ["./src/figma-tokens/token-transformer-input/tokens.json"],
  platforms: {
    mixins: {
      transformGroup: "custom-transform",
      buildPath: "./assets/styles/",
      files: [
        {
          format: "mixinsFormatter",
          filter: "mixinsFilter",
          destination: "mixins.scss",
        },
      ],
    },
    // js: {
    //   transformGroup: "custom-transform",
    //   buildPath: "./src/theme/style-dictionary/",
    //   files: [
    //     {
    //       format: "javascript/module-flat",
    //       filter: "mixinsFilter",
    //       destination: "mixins.js",
    //     },
    //   ],
    // },
    main: {
      transformGroup: "custom-transform",
      buildPath: "./assets/styles/",
      files: [
        {
          format: "scss/variables",
          filter: "withoutMixinsFilter",
          destination: "variables.scss",
        },
      ],
    },
  },
});

// const StyleDictionaryForDarkTheme = StyleDictionary.extend({
//   source: ['./src/figma-tokens/token-transformer-input/dark-theme.json'],
//   platforms: {
//     scss: {
//       transformGroup: 'custom-transform',
//       buildPath: './src/theme/style-dictionary/',
//       files: [
//         {
//           format: 'mixinsFormatter',
//           filter: 'globalVariablesFilter',
//           destination: 'dark-theme.scss',
//         },
//       ],
//     },
//     js: {
//       transformGroup: 'custom-transform',
//       buildPath: './src/theme/style-dictionary/',
//       files: [
//         {
//           format: 'javascript/module-flat',
//           filter: 'globalVariablesFilter',
//           destination: 'dark-theme.js',
//         },
//       ],
//     },
//   },
// });

// const StyleDictionaryForLightTheme = StyleDictionary.extend({
//   source: ['./src/figma-tokens/token-transformer-input/light-theme.json'],
//   platforms: {
//     scss: {
//       transformGroup: 'custom-transform',
//       buildPath: './src/theme/style-dictionary/',
//       files: [
//         {
//           format: 'mixinsFormatter',
//           filter: 'globalVariablesFilter',
//           destination: 'light-theme.scss',
//         },
//       ],
//     },
//     js: {
//       transformGroup: 'custom-transform',
//       buildPath: './src/theme/style-dictionary/',
//       files: [
//         {
//           format: 'javascript/module-flat',
//           filter: 'globalVariablesFilter',
//           destination: 'light-theme.js',
//         },
//       ],
//     },
//   },
// });

StyleDictionaryMixins.buildAllPlatforms();
// StyleDictionaryForDarkTheme.buildAllPlatforms();
// StyleDictionaryForLightTheme.buildAllPlatforms();
