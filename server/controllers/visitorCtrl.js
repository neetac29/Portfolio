const Visitor = require("../models/visitorModels");

const getClientIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "Unknown IP"
  );
};

exports.trackVisit = async (req, res) => {
  try {
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "Unknown IP";

    const browser = req.headers["user-agent"] || "Unknown Browser";
    const page = req.body.page || "/";
    const visitorId = req.body.visitorId;

    if (!visitorId) {
      return res.status(400).json({
        msg: "Visitor ID is required",
      });
    }

    const visitor = await Visitor.findOneAndUpdate(
      { visitorId },
      {
        $set: {
          ipAddress,
          browser,
          page,
          lastVisitedAt: new Date(),
        },
        $inc: {
          visitCount: 1,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      visitor,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Unable to track visitor",
    });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({
      lastVisitedAt: -1,
    });

    const totalVisits = visitors.reduce(
      (sum, item) => sum + item.visitCount,
      0
    );

    res.status(200).json({
      visitors,
      uniqueVisitors: visitors.length,
      totalVisits,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Unable to load visitors",
    });
  }
};