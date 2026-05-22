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
    const ipAddress = getClientIp(req);

    const browser = req.headers["user-agent"] || "Unknown Browser";

    const page = req.body.page || "/";

    const visitor = await Visitor.findOneAndUpdate(
      {
        ipAddress,
        browser,
      },
      {
        $inc: {
          visitCount: 1,
        },

        $set: {
          page,
          lastVisitedAt: new Date(),
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