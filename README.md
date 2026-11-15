# Umbral

Umbral is a host and two clients for streaming a Linux desktop to another computer or an Android device. It is built from forks of existing streaming software, patched to make remote use less painful.

Website: https://notadeveloper4665.github.io/Umbral/

> **Status:** early development. All three projects publish development builds, and several planned features are not built yet.

## Components

| Project | Role | Based on | Platforms |
| --- | --- | --- | --- |
| [Syzygy](https://github.com/NotADeveloper4665/Syzygy) | Host | Apollo | Linux |
| [Eclipse](https://github.com/NotADeveloper4665/Eclipse) | Desktop client | Moonlight | Linux |
| [Occultation](https://github.com/NotADeveloper4665/Occultation) | Android client | Artemide (Moonlight Android) | Android 5.0+ |

This repository holds the project website and links the three together. The code lives in each project's own repository.

## How they fit

1. Run **Syzygy** on the Linux machine whose desktop you want to reach. It can run headless, with no monitor or graphical login.
2. Install **Eclipse** on another Linux computer, or **Occultation** on an Android device.
3. Add the host by address or discovery, then pair with the six-word phrase printed by `syzygy -psk`. Over your own Tailscale network, the phrase can be skipped.
4. Connect. The client saves a certificate, not the phrase, and uses it for later connections.

## Quick start

On the Linux host (supports apt, dnf, zypper, pacman and apk):

```sh
curl -fsSL https://raw.githubusercontent.com/NotADeveloper4665/Syzygy/main/scripts/install-syzygy.sh | bash
syzygy -s -auto
syzygy -psk
```

You can [read the installer](https://github.com/NotADeveloper4665/Syzygy/blob/main/scripts/install-syzygy.sh) before running it. For Fedora RPMs, headless mode and other options, see the [Syzygy README](https://github.com/NotADeveloper4665/Syzygy#readme).

Then install a client:

- **Eclipse:** download the Fedora RPM or Flatpak from the [dev release](https://github.com/NotADeveloper4665/Eclipse/releases/tag/dev).
- **Occultation:** download the [universal APK](https://github.com/NotADeveloper4665/Occultation/releases/download/dev/Occultation-universal.apk).

## Pairing

Anyone who holds the pairing phrase can pair with full host permissions. Share it only with devices you trust.

- **Six-word phrase:** works on every connection. Case is ignored, and spaces and hyphens are interchangeable.
- **Automatic over Tailscale:** off by default. Start the host with `-tails`, or enable it in the Syzygy web UI. Clients on the host's own tailnet then pair without a phrase. Use the host's literal Tailscale IP, not a hostname.
- **PIN:** normal Moonlight PIN pairing still works.

## Development builds

| Project | Builds |
| --- | --- |
| Syzygy | Rolling Fedora 44 x86_64 RPM on the [dev release](https://github.com/NotADeveloper4665/Syzygy/releases/tag/dev). Other distributions build from source. |
| Eclipse | Fedora 44 x86_64 RPM, x86_64 Flatpak and source on the [dev release](https://github.com/NotADeveloper4665/Eclipse/releases/tag/dev), with `SHA256SUMS` and `dev-build.json`. |
| Occultation | Debug-signed APKs on the [dev release](https://github.com/NotADeveloper4665/Occultation/releases/tag/dev). |

## Known limits

- Syzygy's password pairing, key rotation, device revocation and Kyber transport are not built yet.
- Headless mode needs testing on real NVIDIA, Intel and AMD hardware, and installs its runtime automatically on Fedora only.
- Eclipse's automatic Tailscale pairing needs a Linux client, and the Flatpak can't see the host's Tailscale service.
- Occultation's recording, steady-delay buffering, adaptive bitrate and upscaling are planned.
- Occultation's development APKs are debug-signed, not production releases.

## Credits and licenses

Built on Apollo, [Moonlight](https://moonlight-stream.org/), [Artemide](https://github.com/derflacco/moonlight-android) and Artemis. Each project keeps its upstream source history, license notices and copyrights. Syzygy is GPL-3.0; see each repository for its license.
