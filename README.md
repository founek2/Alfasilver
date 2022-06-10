# Repozitář pro web Alfasilver

Textace jsou umístěny ve složce `/src/locale/locale`, pojmenování je stylem `{locale}.yml`. Pro generování html je používán template engine Pub. Vygenerované souboru jsou ve složce `/output` ve formátu `{locale}-index.html`. Složka `/src/images/` se kopíruje do výstupu.

## Příkazy

```bash
gulp            # vygeneruje výstupní soubory
gulp watch      # sleduje změny v /src a generuje za běhu příslušné výstupy
```

## Technologie

-   Sass
-   Gulp
-   pug-i18n

## Design

[xd.adobe.com/view/92c94f55-720c-49c6-89c2-639c7aee07cd-c79a/](xd.adobe.com/view/92c94f55-720c-49c6-89c2-639c7aee07cd-c79a/)
