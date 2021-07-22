This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 소스코드를 내려받아서 사용 시 주의사항
용량 등의 문제를 방지하기 위해 .gitignore를 통해 node_modules 등을 제외하고 올린 상태이니, 
바로 $ yarn build 하면 에러남
- 향후 사용 시 git clone한 다음 $ npm install 또는 $ yarn install 해주면 package.json을 참조하여 필요한 package를 install 해줌
- npm install 하여 필요 패키지 설치 후에 $ yarn build 했는데 "error Command failed with exit code 134." 이런 오류가 출력되면 해당 디렉터리에 "package_lock.json" 파일이 있는지 확인하여 삭제 후 재빌드하면 빌드 성공함
