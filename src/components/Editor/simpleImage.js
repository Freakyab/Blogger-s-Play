class SimpleImage {
  static get toolbox() {
    return {
      title: "Image",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm8 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 2a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/></svg>',
    };
  }

  static get pasteConfig() {
    return {
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
      },
    };
  }

  static get sanitize() {
    return {
      url: {},
      caption: {},
    };
  }

  constructor({ data, api, config, readOnly }) {
    this.api = api;
    this.data = {
      url: data.url || "",
      caption: data.caption || "",
    };
    this.config = config || {};
    this.wrapper = undefined;
    this.settings = [
      {
        name: "caption",
        title: "Caption",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 9h16v2H4zm0 4h10v2H4z"/></svg>',
      },
    ];
    this.readOnly = readOnly;
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("simple-image");
  
    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption);
      return this.wrapper;
    }
  
    const input = document.createElement("input");
    input.classList.add("border", "border-gray-300", "rounded", "py-2", "px-3", "w-full", "mb-4","mt-4");
    input.placeholder = this.config.placeholder || "Paste an image URL...";
    input.addEventListener("paste", (event) => {
      this._createImage(event.clipboardData.getData("text"));
    });
  
    this.wrapper.appendChild(input);
  
    return this.wrapper;
  }
  

  _createImage(url, caption) {
    const image = document.createElement("img");
    image.src = url;
    image.alt = caption;
    image.style.maxWidth = "100%";
    image.style.borderRadius = "5px";
    image.style.marginTop= "50px";
    image.style.marginBottom= "50px";
    image.style.boxShadow = "0 0 10px rgba(0,0,0,1)";

    const captionElement = document.createElement("div");
    captionElement.textContent = caption;

    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(captionElement);
  }

  // ... _toggleTune
  // ... _acceptTuneView
  // ... onPaste

  save(blockContent) {
    const image = blockContent.querySelector("img");
    const caption = blockContent.querySelector("div");

    return {
      url: image ? image.src : "",
      caption: caption ? caption.textContent : "",
    };
  }
  afterRender() {
    const input = this.wrapper.querySelector("input");
    input.addEventListener("paste", (event) => {
      const url = event.clipboardData.getData("text");
      this._createImage(url);
    });
  }
  _acceptTuneView() {
    const caption = this.wrapper.querySelector("div");
    this.data.caption = caption ? caption.textContent : "";
  }
  _toggleTune(tuneName) {
    this.data[tuneName] = !this.data[tuneName];
  }
  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }
    return true;
  }
  renderSettings() {
    const wrapper = document.createElement("div");
    this.settings.forEach((tune) => {
      const el = document.createElement("div");
      el.classList.add("cdx-settings-button");
      el.classList.toggle("cdx-settings-button--active", this.data[tune.name]);
      el.innerHTML = tune.icon;
      wrapper.appendChild(el);
      el.addEventListener("click", () => {
        this._toggleTune(tune.name);
        el.classList.toggle("cdx-settings-button--active");
      });
    });
    return wrapper;
  }
  onPaste(event) {
    const data = {
      url: event.detail.data.innerHTML,
    };
    this._createImage(data.url);
  }
}

export default SimpleImage;
