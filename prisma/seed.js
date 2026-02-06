const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const demoEmail = "demo@notebooklist.app";
  const existingUser = await prisma.user.findFirst();

  if (!existingUser) {
    const passwordHash = await bcrypt.hash("demo1234", 10);
    await prisma.user.create({
      data: {
        name: "Demo User",
        username: "demo_user",
        email: demoEmail,
        passwordHash,
        level: 3,
        pointsBalance: 1200,
        avatarUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAyxGDwEYRMgbv76fYq_fmdygVBwMPBnOHiCflY_E_NCiq6aw0IXUgvrnBXVm59r80TmdKzqulstVzOE0FAC_kGPasNEDKkiwH_pTICb5fQHqkeo8QWIeWui2BK7Xfeuv1Rel8eVH5lUnP6tqvUvFh45oHsiYzPF9Q0cWLBGpOUKfuziGIEVEnlNV-fNfENIzLjlE6N8TQhaoy-bTCWcJs-RW2xLaxzX4CNLs304_ryJauFkLfn84horWEiTBUsog2Uhfs1BlMydk",
      },
    });
  }

  const pointTasks = [
    { title: "每日签到", reward: 10, kind: "check_in" },
    { title: "分享进度", reward: 15, kind: "share_progress" },
    { title: "完成一篇笔记", reward: 20, kind: "finish_note" },
    { title: "完成一个项目", reward: 100, kind: "finish_project" },
  ];

  for (const task of pointTasks) {
    await prisma.pointTask.upsert({
      where: { title: task.title },
      update: {},
      create: task,
    });
  }

  const shopItems = [
    {
      title: "粉粉兔兔主题",
      description: "粉嫩主题皮肤",
      price: 500,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3PV-e_mLVueBdDFYIF8DDqSaEnm2Z2ZxFM9Qnyoemj2I1u-_9tMHtAGuYVL1MkOYVY_-r1O5u_8RUKG6g8b2K451w2fxmPap2oRCAugdMeKRU7VEIBPNhfsk37XkIGK6XrxF2w-olvOtbX3ciCTb3MIERKWNCkigvsm2zFCGgongIXL1o0qAwlPV7MeklLWYhdiwzTnH8O9u8t7zjmOeYXj4osrmMiqmpkfkQXPzIPyXVickiu-Z_jQbsbeOJAZ4B5e8QSZUxvrA",
      category: "主题",
    },
    {
      title: "深海小八图标",
      description: "应用图标套装",
      price: 300,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqj_CeYV9jkPcOWPyx_NxyvHRx1fnxh9t68lIt-a6WxNudwA3TYO1enMis4yWxarEUUMREM-jb14qDEGFErlxPxGMLn0R9ay9fpx7Z9pofUIsXqJri18NgnpWVbW58cgSnLiKXmm7iJOcwIODN9PrKdcoc4JOIsFV1CtGxHLrc_bLQzTR1Hcd68dbemGiktcglQs-3f6k53W9yD_BaKziCy4758Qf3Gdr6V12ULd50r9nqQMhOBRxC8NpmHdpAAiAe_qJ6hM0fW-4",
      category: "图标",
    },
  ];

  for (const item of shopItems) {
    await prisma.shopItem.upsert({
      where: { title: item.title },
      update: {},
      create: item,
    });
  }

  const achievements = [
    {
      title: "笔记达人",
      desc: "创建50篇笔记",
      rarity: "稀有",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCw0DY9UuljiiAlOM80P86m1FaoIsbcAJyBrh3ieFiaogBoz7bZB0oBa0cVbEd6D78gmky_DDQgUJTqNWgEjQLFuezghBQfbqHVuuGxGXbfYnMs2GJE0q8CBPDV52vuUU7V9mga4fehwSGRRMnTADITzNeNnkoxKjE1R7q3XWIcUXHYVLWEdsapafbkyFO5_6iJd1zOus61pWZn8dAAOdP_AlfsSmNq-fIcsC-8zc4XZTXdCtvfzDEA4uzSkp2DEIXak6Qgz78vzBo",
    },
    {
      title: "项目终结者",
      desc: "完成10个项目",
      rarity: "史诗",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDqQ7gw9f1xyt5EiuJ3cAqxViP0Ae5WRa2UC8pxDBFlsOsOeACFf-D8Y2-zLedMuDLX7smE9W6JkDkQN3AefG24ySFiRRtjQqaiWRW1nEaVyHBWU15y2UMmq2e4V31NFBFr-zsxjmwIq5xAJpAoVl0XFejFGCZoacGv5QWU0UhdZ5fDHfw_dD6j2EN98A8zGsabSMgyoybHNWWRSlUd2J3irhI8yLe0pLXwvHBpwV4IsPUub7JRro4n7JeU8Tuy6mzuBbMOv0xQxbc",
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { title: achievement.title },
      update: {},
      create: achievement,
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
