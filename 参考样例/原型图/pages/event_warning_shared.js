(function () {
  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }

    callback();
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getPageName(href) {
    return String(href || "").split("#")[0].split("?")[0].split("/").pop();
  }

  function isEmbedded() {
    return window.self !== window.top;
  }

  function openInParentShell(href) {
    const targetHref = String(href || "").split("#")[0].split("?")[0];

    if (!targetHref) {
      return false;
    }

    try {
      if (
        window.parent &&
        window.parent !== window &&
        typeof window.parent.openPrototypeModule === "function"
      ) {
        window.parent.openPrototypeModule(targetHref);
        return true;
      }
    } catch (error) {
      return false;
    }

    try {
      window.parent.postMessage(
        {
          source: "prototype-shell",
          action: "open",
          href: targetHref,
        },
        "*",
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  function initMenuSections() {
    document.querySelectorAll(".menu-section").forEach((section) => {
      const trigger = section.querySelector(":scope > .menu-trigger");

      if (!trigger) {
        return;
      }

      trigger.addEventListener("click", () => {
        section.classList.toggle("open");
      });
    });
  }

  function syncSidebarActive() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".menu-link, .submenu-link").forEach((link) => {
      const pageName = getPageName(link.getAttribute("href"));

      if (pageName === currentPage) {
        link.classList.add("active");
        const parentSection = link.closest(".menu-section");

        if (parentSection) {
          parentSection.classList.add("open");
        }
      } else if (!link.classList.contains("active")) {
        link.classList.remove("active");
      }
    });
  }

  function bindShellAwareLinks() {
    document.querySelectorAll("[data-shell-aware-link]").forEach((link) => {
      link.addEventListener("click", function (event) {
        if (!isEmbedded()) {
          return;
        }

        const href = this.getAttribute("href");

        if (!href) {
          return;
        }

        event.preventDefault();
        openInParentShell(href);
      });
    });
  }

  function getToastStack() {
    let stack = document.querySelector(".toast-stack");

    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }

    return stack;
  }

  function showToast(title, text) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML =
      '<i class="ri-information-line"></i>' +
      '<div><div class="toast-title">' +
      escapeHtml(title) +
      '</div><div class="toast-text">' +
      escapeHtml(text || "") +
      "</div></div>";

    const stack = getToastStack();
    stack.appendChild(toast);

    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-6px)";
    }, 2400);

    window.setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  function openModal(mask) {
    if (!mask) {
      return;
    }

    mask.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(mask) {
    if (!mask) {
      return;
    }

    mask.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function initModalCloseHandlers() {
    document.querySelectorAll("[data-modal-close]").forEach((button) => {
      button.addEventListener("click", function () {
        closeModal(this.closest(".modal-mask"));
      });
    });

    document.querySelectorAll(".modal-mask").forEach((mask) => {
      mask.addEventListener("click", function (event) {
        if (event.target === mask) {
          closeModal(mask);
        }
      });
    });
  }

  window.EventWarningModule = {
    closeModal,
    escapeHtml,
    openModal,
    showToast,
  };

  onReady(() => {
    initMenuSections();
    syncSidebarActive();
    bindShellAwareLinks();
    initModalCloseHandlers();
  });
})();
