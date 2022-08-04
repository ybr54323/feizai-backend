export default {
  genUserAndPwd() {
    try {
      let u, p;
      const argvs = process.argv;
      for (let i = 0, len = argvs.length; i < len - 1; i++) {
        const argv = process.argv[i];
        if (["-u", "--user"].includes(argv)) {
          u = argvs[i + 1];
        }
        if (["-p", "--password"].includes(argv)) {
          p = argvs[i + 1];
        }
      }
      if (u && p) return [u, p];
    } catch (error) {
      throw new Error({ ...error });
    }

    throw new Error("boot project should width -u and -p");
  },
};
