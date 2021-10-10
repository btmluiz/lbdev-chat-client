abstract class AbstractBaseService<props = {}> {
  protected initialize(instance: any, data?: props) {
    return instance;
  }
}

export default AbstractBaseService;
