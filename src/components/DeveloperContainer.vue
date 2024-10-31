<script setup>
import DeveloperAvatar from './icons/DeveloperAvatar.vue'
import GithubIcon from './icons/GithubIcon.vue'
import LinkedInIcon from './icons/LinkedInIcon.vue'
</script>

<template>
  <div class="developer-container">
    <div className="dev">
      <div className="text">Developed by{{ '\u00A0' }}</div>
      <div className="dev-link dev-links-container tooltip">
        <div className="dev-avatar">
          <DeveloperAvatar />
        </div>
        <div className="tooltip-content">
          <a
            className="dev-link tooltip"
            href="https://github.com/seljukat"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
          <div className="divider-line"></div>
          <a
            className="dev-link tooltip"
            href="https://www.linkedin.com/in/sel%C3%A7uk-topkaya/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </a>
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.developer-container {
  width: 100%;
  height: 2.5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dev {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}

.dev-links-container:hover .dev-avatar {
  color: black;
}

.dev .dev-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dev .tooltip {
  position: relative;
}

.dev .tooltip .tooltip-content {
  top: -15px;
  left: 50%;
  transform: translate(-50%, -100%);
  padding: 1rem;
  color: #000000;
  background-color: #eaddca;
  border-radius: 20px;
  position: absolute;
  z-index: 999;
  border: 5px solid black;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.8s;

  display: flex;
  /* flex-wrap: nowrap;
  align-items: center;
  justify-content: center; */
}

.dev .tooltip:hover .tooltip-content {
  visibility: visible;
  opacity: 1;
}

.dev .divider-line {
  margin: 0 1rem;
  width: 0;
  border: 2px dashed black;
}

.dev .dev-link {
  font-size: 2rem;
  text-decoration: none;
  color: white;
}

.dev .tooltip-content .dev-link {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dev .tooltip-content .dev-link:hover {
  color: black;
}
.dev .tooltip-content .dev-link:active {
  color: white;
}

.dev .tooltip .tooltip-content i {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 20px;
  overflow: hidden;
}

.dev .tooltip .tooltip-content i::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background-color: #eaddca;
  border: 5px solid black;
}
</style>
