// src/components/Music/AudioPlayer.jsx
import { Music } from 'lucide-react';

// Helper function to safely check if URL is from a specific domain
const isFromDomain = (url, domain) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`);
  } catch {
    return false;
  }
};

export default function AudioPlayer({ musicUrl, musicFileUrl, title }) {
  const audioSource = musicFileUrl || musicUrl;

  if (!audioSource) return null;

  // Check if it's a streaming URL (Spotify, YouTube, SoundCloud)
  const isStreamingUrl = musicUrl && (
    isFromDomain(musicUrl, 'spotify.com') ||
    isFromDomain(musicUrl, 'youtube.com') ||
    isFromDomain(musicUrl, 'youtu.be') ||
    isFromDomain(musicUrl, 'soundcloud.com')
  );

  if (isStreamingUrl) {
    // Handle Spotify embeds
    if (isFromDomain(musicUrl, 'spotify.com')) {
      const trackId = musicUrl.split('/').pop().split('?')[0];
      return (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <Music size={20} className="text-pink-500 mr-2" />
            <span className="font-medium text-gray-700">Listen on Spotify</span>
          </div>
          <iframe
            src={`https://open.spotify.com/embed/track/${trackId}`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="encrypted-media"
            className="rounded-lg"
          ></iframe>
        </div>
      );
    }

    // Handle YouTube embeds
    if (isFromDomain(musicUrl, 'youtube.com') || isFromDomain(musicUrl, 'youtu.be')) {
      let videoId;
      if (musicUrl.includes('youtu.be')) {
        videoId = musicUrl.split('/').pop().split('?')[0];
      } else {
        videoId = new URLSearchParams(new URL(musicUrl).search).get('v');
      }

      return (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <Music size={20} className="text-pink-500 mr-2" />
            <span className="font-medium text-gray-700">Watch on YouTube</span>
          </div>
          <iframe
            width="100%"
            height="200"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      );
    }

    // For other streaming services, just show a link
    return (
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4">
        <div className="flex items-center">
          <Music size={20} className="text-pink-500 mr-2" />
          <a
            href={musicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            Listen on external platform →
          </a>
        </div>
      </div>
    );
  }

  // For uploaded MP3 files or direct audio URLs
  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4">
      <div className="flex items-center mb-3">
        <Music size={20} className="text-pink-500 mr-2" />
        <span className="font-medium text-gray-700">Audio</span>
      </div>
      <audio
        controls
        className="w-full"
        src={audioSource}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
