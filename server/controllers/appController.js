const User = require("../models/User");

/* CREATE */
const createApp = async (req, res) => {
  try {
    const { updatedAppName, updatedProviders, userId } = req.body;

    console.log(req.body);
    console.log(updatedAppName);
    const appData = {
      appName: updatedAppName,
      providers: updatedProviders,
    };
    console.log(appData);
    const updatedApps = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { apps: appData } },
      { new: true, runValidators: true }
    );
    if (!updatedApps) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(updatedApps);
    return res.status(200).json({
      msg: "Apps array updated successfully",
      apps: updatedApps.apps,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = [];
      for (const field in error.errors) {
        validationErrors.push(error.errors[field].message);
      }
      return res.status(403).json({
        msg: error.name,
        msgErrors: validationErrors,
      });
    }
    res.status(500).json({ msg: error });
  }
};

/* UPDATE */
const updateApp = async (req, res) => {
  try {
    const { userId: id, appId, updatedAppName, updatedProviders } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          "apps.$[elem].appName": appName,
          "apps.$[elem].providers": providers,
        },
      },
      {
        arrayFilters: [{ "elem._id": appId }],
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ apps: user.apps });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* READ */
const getAllApps = async (req, res) => {
  try {
    const { userId: id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ apps: user.apps });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* DELETE */
const deleteApp = async (req, res) => {
  try {
    const { userId: id, appId } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { apps: { _id: appId } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ apps: user.apps });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createApp, updateApp, deleteApp, getAllApps };
