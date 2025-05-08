# Personal Study Notes & Digital Garden 🌱

<img src="./content/Attachments/banners/ghibli.webp" alt="drawing" width="200"/>

> _Never apologise for being obsessed. Read all day. Work all night. Run for hours. Forget time exists. Be everywhere, but be a ghost. Turn off the world and create your own. Let craft become compulsion. Positive obsession is a gift, disguised as a curse._

This is my digital garden - a collection of interconnected notes, studies, and insights from my journey in software development and system administration.

# License & Disclaimer

This project is licensed under the MIT License, but everything under the `/content` directory is not included in this license. Everything under `/content` is my personal notes and studies and should not be used for any purpose other than personal reference.

# Usage

## Updating

```bash
cd content
git add .
git commit -m "Update notes"
git push

# Go back to the root directory
# in order to update the submodule reference.
cd ..
git add content
git commit -m "Update content submodule reference"
git push
```

## Cloning

```bash
git clone --recurse-submodules git@github.com:devnyxie/quartz-notes.git
```
