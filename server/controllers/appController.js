const User = require("../models/User");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

/* CREATE */
const createApp = async (req, res) => {
  try {
    const { appName, provider, userId } = req.body;
    const appData = {
      appName,
      provider,
    };
    const opts = { runValidators: true };
    const updatedApps = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { apps: appData } },
      { new: true, ...opts }
    );
    if (!updatedApps) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Apps array updated successfully",
      apps: updatedApps.apps,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = [];
      for (const field in error.errors) {
        validationErrors.push(error.errors[field].message);
      }
      return res.status(403).json({
        error: validationErrors,
      });
    }
    res.status(500).json({ error: error.errors });
  }
};

/* UPDATE */
const updateApp = async (req, res) => {
  try {
    const { userId: id, appId, updatedAppName, updatedProvider } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          "apps.$[elem].appName": updatedAppName,
          "apps.$[elem].provider": updatedProvider,
        },
      },
      {
        arrayFilters: [{ "elem._id": appId }],
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ apps: user.apps });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* READ */
const getAllApps = async (req, res) => {
  try {
    const { userId: id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ apps: user.apps });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createApp, updateApp, deleteApp, getAllApps };
