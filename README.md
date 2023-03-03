# Zoom Apps Camera Mode Sample

This project uses parcel to serve a static **frontend only** sample that demonstrates how to use Camera Mode with the Zoom Apps SDK. 

For more
information about the Layers API and Camera Mode check out our docs
at https://marketplace.zoom.us/docs/zoom-apps/guides/layers-api/



## Prerequisites

1. [Node JS](https://nodejs.org/en/)
2. [Ngrok](https://ngrok.com/docs/getting-started)
3. [Zoom Account](https://support.zoom.us/hc/en-us/articles/207278726-Plan-Types-)

## Getting Started

Open your terminal:

```bash
# Clone down this repository
git clone git@github.com:zoom/zoomapps-cameramode-vuejs.git

# navigate into the cloned project directory
cd zoomapps-cameramode-vuejs

# install dependencies
npm install

# start the development server
npm run dev

# use Ngrok to expose the port
ngrok http 1234
```

## Usage

As this is a static application without a backend usage is simple.

1. Create your Zoom App from the Zoom Marketplace
2. Install your Zoom App from the Zoom Marketplace
3. Start the application (steps above)
4. Open the application in your Zoom Client under the Apps tab

> This sample does **not** include functionality for installing your app. Install your
> app using the Add button from the Zoom Marketplace and ignore the error on redirect

### Create your Zoom App

In your web browser, navigate to [Zoom Developer Portal](https://developers.zoom.us/) and register/log into your
developer account.

Click the "Build App" button at the top and choose to "Zoom Apps" application.

1. Name your app
2. Choose whether to list your app on the marketplace or not
3. Click "Create"

For more information, you can follow [this guide](https://dev.to/zoom/introducing-zoom-apps-33he)
check out [this video series](https://www.youtube.com/playlist?list=PLKpRxBfeD1kGN-0QgQ6XtSwtxI3GQM16R) on how to create
and configure these sample Zoom Apps.

### Config: App Credentials

In your terminal where you launched `ngrok`, find the `Forwarding` value and copy/paste that into the "Home URL" and "
Redirect URL for OAuth" fields.

```
Home URL:               https://xxxxx.ngrok.io
Redirect URL for OAuth: https://xxxxx.ngrok.io
```

> NOTE: ngrok URLs under ngrok's Free plan are ephemeral, meaning they will only live for up to a couple hours at most,
> and will change every time you reinitialize the application. This will require you to update these fields every time
> you
> restart your ngrok service.

#### OAuth allow list

- `https://example.ngrok.io`

#### Domain allow list

- `ngrok.io`

### Config: Information

The following information is required to activate your application:

- Basic Information
    - App name
    - Short description
    - Long description (entering a short message here is fine for now)
- Developer Contact Information
    - Name
    - Email address

> NOTE: if you intend to publish your application on the Zoom Apps Marketplace, more information will be required in
> this section before submitting.

### Config: App Features

Under the Zoom App SDK section, click the `+ Add APIs` button and enable the following options from their respective
sections:

### Scopes

Ensure that the following scope is selected on the Scopes tab:

- `zoomapp:inmeeting`

### Testing

At this time there are no e2e or unit tests.

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or
our [Developer Forum](https://devforum.zoom.us). Priority support is also available
with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

### Documentation

Make sure to review [our documentation](https://marketplace.zoom.us/docs/zoom-apps/introduction/) as a reference when
building your Zoom Apps.
